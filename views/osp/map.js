function(doc){
  for(attribute in doc){
    emit([doc[attribute], doc._id, attribute],null);
  }
}
