/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _libRemaps = require("./lib/remaps");

var _libRemaps2 = _interopRequireDefault(_libRemaps);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _helpersObject = require("../../helpers/object");

var _helpersObject2 = _interopRequireDefault(_helpersObject);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

/**
 * [Please add a description.]
 */

var t = _interopRequireWildcard(_types);

var metadataVisitor = {

  /**
   * [Please add a description.]
   */

  ModuleDeclaration: {
    enter: function enter(node, parent, scope, formatter) {
      if (node.source) {
        node.source.value = formatter.file.resolveModuleSource(node.source.value);
        formatter.addScope(this);
      }
    }
  },

  /**
   * [Please add a description.]
   */

  ImportDeclaration: {
    exit: function exit(node, parent, scope, formatter) {
      formatter.hasLocalImports = true;

      var specifiers = [];
      var imported = [];
      formatter.metadata.imports.push({
        source: node.source.value,
        imported: imported,
        specifiers: specifiers
      });

      var _arr = this.get("specifiers");

      for (var _i = 0; _i < _arr.length; _i++) {
        var specifier = _arr[_i];
        var ids = specifier.getBindingIdentifiers();
        _lodashObjectExtend2["default"](formatter.localImports, ids);

        var local = specifier.node.local.name;

        if (specifier.isImportDefaultSpecifier()) {
          imported.push("default");
          specifiers.push({
            kind: "named",
            imported: "default",
            local: local
          });
        }

        if (specifier.isImportSpecifier()) {
          var importedName = specifier.node.imported.name;
          imported.push(importedName);
          specifiers.push({
            kind: "named",
            imported: importedName,
            local: local
          });
        }

        if (specifier.isImportNamespaceSpecifier()) {
          imported.push("*");
          specifiers.push({
            kind: "namespace",
            local: local
          });
        }
      }
    }
  },

  /**
   * [Please add a description.]
   */

  ExportDeclaration: function ExportDeclaration(node, parent, scope, formatter) {
    formatter.hasLocalExports = true;

    var source = node.source ? node.source.value : null;
    var exports = formatter.metadata.exports;

    // export function foo() {}
    // export var foo = "bar";
    var declar = this.get("declaration");
    if (declar.isStatement()) {
      var bindings = declar.getBindingIdentifiers();

      for (var name in bindings) {
        var binding = bindings[name];
        formatter._addExport(name, binding);

        exports.exported.push(name);
        exports.specifiers.push({
          kind: "local",
          local: name,
          exported: this.isExportDefaultDeclaration() ? "default" : name
        });
      }
    }

    if (this.isExportNamedDeclaration() && node.specifiers) {
      var _arr2 = node.specifiers;

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var specifier = _arr2[_i2];
        var exported = specifier.exported.name;
        exports.exported.push(exported);

        // export foo from "bar";
        if (t.isExportDefaultSpecifier(specifier)) {
          exports.specifiers.push({
            kind: "external",
            local: exported,
            exported: exported,
            source: source
          });
        }

        // export * as foo from "bar";
        if (t.isExportNamespaceSpecifier(specifier)) {
          exports.specifiers.push({
            kind: "external-namespace",
            exported: exported,
            source: source
          });
        }

        var local = specifier.local;
        if (!local) continue;

        formatter._addExport(local.name, specifier.exported);

        // export { foo } from "bar";
        // export { foo as bar } from "bar";
        if (source) {
          exports.specifiers.push({
            kind: "external",
            local: local.name,
            exported: exported,
            source: source
          });
        }

        // export { foo };
        // export { foo as bar };
        if (!source) {
          exports.specifiers.push({
            kind: "local",
            local: local.name,
            exported: exported
          });
        }
      }
    }

    // export * from "bar";
    if (this.isExportAllDeclaration()) {
      exports.specifiers.push({
        kind: "external-all",
        source: source
      });
    }

    if (!t.isExportDefaultDeclaration(node) && !declar.isTypeAlias()) {
      var onlyDefault = node.specifiers && node.specifiers.length === 1 && t.isSpecifierDefault(node.specifiers[0]);
      if (!onlyDefault) {
        formatter.hasNonDefaultExports = true;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  Scope: function Scope(node, parent, scope, formatter) {
    if (!formatter.isLoose()) {
      this.skip();
    }
  }
};

/**
 * [Please add a description.]
 */

var DefaultFormatter = (function () {
  function DefaultFormatter(file) {
    _classCallCheck(this, DefaultFormatter);

    // object containg all module sources with the scope that they're contained in
    this.sourceScopes = _helpersObject2["default"]();

    // ids for use in module ids
    this.defaultIds = _helpersObject2["default"]();
    this.ids = _helpersObject2["default"]();

    // contains reference aliases for live bindings
    this.remaps = new _libRemaps2["default"](file, this);

    this.scope = file.scope;
    this.file = file;

    this.hasNonDefaultExports = false;

    this.hasLocalExports = false;
    this.hasLocalImports = false;

    this.localExports = _helpersObject2["default"]();
    this.localImports = _helpersObject2["default"]();

    this.metadata = file.metadata.modules;
    this.getMetadata();
  }

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.addScope = function addScope(path) {
    var source = path.node.source && path.node.source.value;
    if (!source) return;

    var existingScope = this.sourceScopes[source];
    if (existingScope && existingScope !== path.scope) {
      throw path.errorWithNode(messages.get("modulesDuplicateDeclarations"));
    }

    this.sourceScopes[source] = path.scope;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.isModuleType = function isModuleType(node, type) {
    var modules = this.file.dynamicImportTypes[type];
    return modules && modules.indexOf(node) >= 0;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.transform = function transform() {
    this.remapAssignments();
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.doDefaultExportInterop = function doDefaultExportInterop(node) {
    return (t.isExportDefaultDeclaration(node) || t.isSpecifierDefault(node)) && !this.noInteropRequireExport && !this.hasNonDefaultExports;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getMetadata = function getMetadata() {
    var has = false;
    var _arr3 = this.file.ast.program.body;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var node = _arr3[_i3];
      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has || this.isLoose()) {
      this.file.path.traverse(metadataVisitor, this);
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.remapAssignments = function remapAssignments() {
    if (this.hasLocalExports || this.hasLocalImports) {
      this.remaps.run();
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.remapExportAssignment = function remapExportAssignment(node, exported) {
    var assign = node;

    for (var i = 0; i < exported.length; i++) {
      assign = t.assignmentExpression("=", t.memberExpression(t.identifier("exports"), exported[i]), assign);
    }

    return assign;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._addExport = function _addExport(name, exported) {
    var info = this.localExports[name] = this.localExports[name] || {
      binding: this.scope.getBindingIdentifier(name),
      exported: []
    };
    info.exported.push(exported);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getExport = function getExport(node, scope) {
    if (!t.isIdentifier(node)) return;

    var local = this.localExports[node.name];
    if (local && local.binding === scope.getBindingIdentifier(node.name)) {
      return local.exported;
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getModuleName = function getModuleName() {
    var opts = this.file.opts;
    // moduleId is n/a if a `getModuleId()` is provided
    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      // remove sourceRoot from filename
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    if (!opts.keepModuleIdExtensions) {
      // remove extension
      filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");
    }

    moduleName += filenameRelative;

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      // If return is falsy, assume they want us to use our generated default name
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._pushStatement = function _pushStatement(ref, nodes) {
    if (t.isClass(ref) || t.isFunction(ref)) {
      if (ref.id) {
        nodes.push(t.toStatement(ref));
        ref = ref.id;
      }
    }

    return ref;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._hoistExport = function _hoistExport(declar, assign, priority) {
    if (t.isFunctionDeclaration(declar)) {
      assign._blockHoist = priority || 2;
    }

    return assign;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getExternalReference = function getExternalReference(node, nodes) {
    var ids = this.ids;
    var id = node.source.value;

    if (ids[id]) {
      return ids[id];
    } else {
      return this.ids[id] = this._getExternalReference(node, nodes);
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.checkExportIdentifier = function checkExportIdentifier(node) {
    if (t.isIdentifier(node, { name: "__esModule" })) {
      throw this.file.errorWithNode(node, messages.get("modulesIllegalExportName", node.name));
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportAllDeclaration = function exportAllDeclaration(node, nodes) {
    var ref = this.getExternalReference(node, nodes);
    nodes.push(this.buildExportsWildcard(ref, node));
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.isLoose = function isLoose() {
    return this.file.isLoose("es6.modules");
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportSpecifier = function exportSpecifier(specifier, node, nodes) {
    if (node.source) {
      var ref = this.getExternalReference(node, nodes);

      if (specifier.local.name === "default" && !this.noInteropRequireExport) {
        // importing a default so we need to normalize it
        ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
      } else {
        ref = t.memberExpression(ref, specifier.local);

        if (!this.isLoose()) {
          nodes.push(this.buildExportsFromAssignment(specifier.exported, ref, node));
          return;
        }
      }

      // export { foo } from "test";
      nodes.push(this.buildExportsAssignment(specifier.exported, ref, node));
    } else {
      // export { foo };
      nodes.push(this.buildExportsAssignment(specifier.exported, specifier.local, node));
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsWildcard = function buildExportsWildcard(objectIdentifier) {
    return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [t.identifier("exports"), t.callExpression(this.file.addHelper("interop-require-wildcard"), [objectIdentifier])]));
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsFromAssignment = function buildExportsFromAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-from-assign", {
      INIT: init,
      ID: t.literal(id.name)
    }, true);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsAssignment = function buildExportsAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-assign", {
      VALUE: init,
      KEY: id
    }, true);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    var declar = node.declaration;

    var id = declar.id;

    if (t.isExportDefaultDeclaration(node)) {
      id = t.identifier("default");
    }

    var assign;

    if (t.isVariableDeclaration(declar)) {
      for (var i = 0; i < declar.declarations.length; i++) {
        var decl = declar.declarations[i];

        decl.init = this.buildExportsAssignment(decl.id, decl.init, node).expression;

        var newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === 0) t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      var ref = declar;

      if (t.isFunctionDeclaration(declar) || t.isClassDeclaration(declar)) {
        ref = declar.id;
        nodes.push(declar);
      }

      assign = this.buildExportsAssignment(id, ref, node);

      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  };

  return DefaultFormatter;
})();

exports["default"] = DefaultFormatter;
module.exports = exports["default"];