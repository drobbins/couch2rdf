# Couch2RDF

Export CouchDB documents as triples, using the following conventions:

* Subject = ``doc._id``
* Predicate = ``attribute``
* Object = ``doc.attribute``
