function(head, req) {

  /**
   * Shamelessly adapted from Sessel's triples list
   * https://github.com/agrueneberg/Sessel
   */

  //Setup the namespace
  var default_namespace = req.query.namespace || "http://db/"+req.path[0]+"#",
      ns = default_namespace,
      default_namespace_abbreviation = req.query.default_namespace_abbreviation || req.path[0],
      nsa = default_namespace_abbreviation;

  /**
   * Extract subject, predicate, object_type and object from key
   * @param row getRow() result
   * @param req req object
   * @return [subject, predicate, object_type, object]
   */
  var extractTriple = function(row, req) {
    if (req.path[5] === 'spo') {
      return [row.key[0], row.key[1], row.key[2]];
    } else if (req.path[5] === 'pos') {
      return [row.key[2], row.key[0], row.key[1]];
    } else if (req.path[5] === 'osp') {
      return [row.key[1], row.key[2], row.key[0]];
    }
  };

  /**
   * Determines if triple is allowed to be sent
   * @param row getRow() result
   * @param req req object
   * @return boolean true if allowed, false otherwise
   */
  var permissionFilter = function(row, req) {
      return true;
  };

  var send_triple_as = {
    n3 : function(triple){
      var description = '';
      description += '<' + nsa + ':' + triple[0] + '>';
      description += ' ';
      description += '<' + nsa + ':' + triple[1] + '>';
      description += ' ';
      description += '"' + triple[2] + '"';
      description += ' .\n';
      send(description);
    },
    rdf : function(triple){
      var description = '';
      description += '<rdf:Description rdf:about="' + triple[0] + '">';
      description += '<'+nsa+':'+triple[1]+'>'+escape(triple[2])+'</'+nsa+':'+triple[1]+'>';
      description += '</rdf:Description>';
      send(description);
    },
    html : function(triple){
      var description = '';
      description += '&lt;' + triple[0] + '&gt;';
      description += ' ';
      description += '&lt;' + triple[1] + '&gt;';
      description += ' ';
      description += '"' + triple[2] + '"';
      description += ' .<br />'
      send(description);
    }
  }

  var send_triples_as = function(format){
    if (typeof send_triple_as[format] != 'function'){
      throw(["error", "triple format unknown", "No triple formatting function for "+format+". You can add one as send_triple_as["+format+"]"]);
    }
    var row;
    while (row = getRow()){
      if (permissionFilter(row, req)) {
        var triple = extractTriple(row, req);
        send_triple_as[format](triple);
      }
    }
  }

  // N3 output
  registerType('n3', 'text/n3');
  provides('n3', function() {
    start({
      "headers" : {
        "Content-Disposition" : "attachment; filename=Couch2RDF.n3"
      }
    });
    //setup the prefix
    send('@prefix ' + nsa + ': <' + ns + '>\n');
    send_triples_as('n3');
  });

  // RDF output
  registerType('rdf', 'application/rdf+xml');
  provides('rdf', function() {
    start({
      "headers" : {
        "Content-Disposition" : "attachment; filename=Couch2RDF.rdf"
      }
    });
    var namespaceRegex = /^(.*[/#])(.*)$/;
    var namespaceLookup = [];
    send('<?xml version="1.0" encoding="UTF-8"?>\n');
    send('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">');
    send('<rdf:RDF xmlns:' + nsa + '="' + ns + '">');
    send_triples_as('rdf');
    send('</rdf:RDF>');
  });

  // HTML output, default.
  provides('html', function() {
    send_triples_as('html');
  });


}
