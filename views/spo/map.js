function(doc){
  for(attribute in doc){
    emit([doc._id, attribute, doc[attribute]],null);
  }
}
