function(doc){
  for(attribute in doc){
    emit([attribute, doc[attribute], doc._id],null);
  }
}
