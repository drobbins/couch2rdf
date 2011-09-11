function(head, req) {

  /**
   * Shamelessly adapted from Sessel's triples list
   * https://github.com/agrueneberg/Sessel
   */


  /**
   * Extract subject, predicate, object_type and object from key
   * @param row getRow() result
   * @param req req object
   * @return [subject, predicate, object_type, object]
   */
  var extractTriple = function(row, req) {
    //if (req.path[5] === 'spo') {
      return [row.key[0], row.key[1], row.key[2]];
    //} else if (req.path[5] === 'pos') {
    //  return [row.key[2], row.key[0], row.key[1]];
    //} else if (req.path[5] === 'osp') {
    //  return [row.key[1], row.key[2], row.key[0]];
    //}
  };

  /**
   * Determines if triple is allowed to be sent
   * @param row getRow() result
   * @param req req object
   * @return boolean true if allowed, false otherwise
   */
  var permissionFilter = function(row, req) {
      //var permission = row.value;
      //if (permission == 'public' || (req.userCtx.name && permission == 'private')) {
      //  return true;
      //} else {
      //  return false;
      //}
      return true;
  };

  // HTML output
  provides('html', function() {
    var row;
    send(req.dir);
    while (row = getRow()) {
      if (permissionFilter(row, req)) {
        var triple = extractTriple(row, req);
        var description = '';
        description += '&lt;' + triple[0] + '&gt;';
        description += ' ';
        description += '&lt;' + triple[1] + '&gt;';
        description += ' ';
        description += '&lt;' + triple[2] + '&gt;';
        //if (triple[2] === 'URI') {
        //  description += '&lt;' + triple[3] + '&gt;';
        //} else if (triple[2] === 'Literal') {
        //  description += '"' + triple[3] + '"';
        //}
        description += ' .<br />'
        send(description);
      }
    }
  });
/*
  // N3 output
  registerType('n3', 'text/n3');
  provides('n3', function() {
    var row;
    while (row = getRow()) {
      if (permissionFilter(row, req)) {
        var triple = extractTriple(row, req);
        var description = '';
        description += '<' + triple[0] + '>';
        description += ' ';
        description += '<' + triple[1] + '>';
        description += ' ';
        if (triple[2] === 'URI') {
          description += '<' + triple[3] + '>';
        } else if (triple[2] === 'Literal') {
          description += '"' + triple[3] + '"';
        }
        description += ' .\n';
        send(description);
      }
    }
  });

  // RDF output
  registerType('rdf', 'application/rdf+xml');
  provides('rdf', function() {
    var namespaceRegex = /^(.*[/#])(.*)$/;
    var namespaceLookup = [];
    send('<?xml version="1.0" encoding="UTF-8"?>\n');
    send('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">');
    var row;
    while (row = getRow()) {
      if (permissionFilter(row, req)) {
        var triple = extractTriple(row, req);
        // Extract namespace by only using the part before the last slash or hash
        var matcher = triple[1].match(namespaceRegex);
        var namespace = matcher[1];
        var namespaceIndex = namespaceLookup.indexOf(namespace);
        if (namespaceIndex === -1) {
          namespaceLookup.push(namespace);
          namespaceIndex = namespaceLookup.length - 1;
        }
        var identifier = matcher[2];
        // Generate description
        var description = '';
        description += '<rdf:Description rdf:about="' + triple[0] + '">';
        if (triple[2] === 'URI') {
          description += '<ns' + namespaceIndex + ':' + identifier + ' xmlns:ns' + namespaceIndex + '="' + namespace + '" rdf:resource="' + triple[3] + '" />';
        } else if (triple[2] === 'Literal') {
          description += '<ns' + namespaceIndex + ':' + identifier + ' xmlns:ns' + namespaceIndex + '="' + namespace + '">';
          // Escape literals
          description += escape(triple[3]);
          description += '</ns' + namespaceIndex + ':' + identifier + '>';
        }
        description += '</rdf:Description>';
        send(description);
      }
    }
    send('</rdf:RDF>');
  });
*/

}