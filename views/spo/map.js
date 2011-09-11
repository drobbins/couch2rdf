function(doc){
  for(attribute in doc){
    if(attribute != "_id"){
      emit([doc._id, attribute, doc[attribute]],null);
    }
  }
}
