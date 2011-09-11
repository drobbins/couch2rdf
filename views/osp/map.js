function(doc){
  for(attribute in doc){
    if(attribute != "_id"){
      emit([doc[attribute], doc._id, attribute],null);
    }
  }
}
