# Couch2RDF

Export CouchDB documents as triples, using the following conventions:

* Subject = ``doc._id``
* Predicate = ``attribute``
* Object = ``doc.attribute``
* Default namespace = ``database name``

## Credits

* [@jalmeida](https://github.com/jonasalmeida) for the original "documents are triples" idea.
* [@agrueneberg](https://github.com/agrueneberg) for general goodness in [Sessel](https://github.com/agrueneberg/Sessel).
