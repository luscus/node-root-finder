/*
    Copyright (C) 2013  Luscus
    <https://github.com/luscus/node-root-finder>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program: see COPYING in the root directory.
    If not, see <http://www.gnu.org/licenses/>.
*/

// load modules
var Path = require('path');


// variables
var parent = {};



var RootFinder = RootFinder || (function() {
  'use strict';

  var dir_array = __dirname.split(Path.sep),
      found = false,
      depth = 0,
      npm_package,
      bower,
      path;


  while (depth++ < dir_array.length) {
    path = dir_array.slice(0, depth).join(Path.sep);


    try {
      // try to load package.json
      npm_package = require(path + '/package.json');
      found = true;
    }
    catch (ex) {
      // no package.json found
      //console.log('  --> no package.json found in', path);
    }

    try {
      // try to load package.json
      bower = require(root_path + '/bower.json');
    }
    catch (ex) {
      // no package.json found
      bower = false;
      //console.log('    > no bower.json found in', path);
    }

    if (found)
      break;
  }


  return {
    name: npm_package.name,
    directory: Path.basename(path),
    package: npm_package,
    bower: bower,
    path: path
  };
}).call(this);


module.exports = RootFinder;
