function(doc){
  for(attribute in doc){
    if(attribute != "_id"){
      emit([attribute, doc[attribute], doc._id],null);
    }
  }
}
