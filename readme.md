# Couch2RDF

Export CouchDB documents as triples, using the following conventions:

* Subject = ``doc._id``
* Predicate = ``attribute``
* Object = ``doc.attribute``
* Default namespace = ``database name``

## Installation

Requires [CouchDB](http://couchdb.apache.org/) and your data.

### Option 1

Replicate [from iriscouch](http://robbinsd.iriscouch.com/couch2rdf) into your DB.

### Option 2

Make a local clone of this repository and ``couchapp push http://username:pass@localhost:5984/somedb``.
Needless to say, this option requires [CouchApp](http://couchapp.org/page/index).

## Usage

1. Visit ``http://localhost:5984/somedb/_design/couch2rdf/_list/triples/spo``
2. OR for N3: ``curl -H "Accept: text/n3" http://localhost:5984/somedb/_design/couch2rdf/_list/triples/spo``
3. OR for RDF: ``curl -H "Accept: application/rdf+xml" http://localhost:5984/somedb/_design/couch2rdf/_list/triples/spo``

Where ``somedb`` is your database name, and ``spo`` can be replaced with ``osp`` or ``pos``.

## Credits

* [@jalmeida](https://github.com/jonasalmeida) for the original "documents are triples" idea.
* [@agrueneberg](https://github.com/agrueneberg) for general goodness in [Sessel](https://github.com/agrueneberg/Sessel).
