declare const FaqDeleteInput = "\n  input FaqDeleteInputClause {\n      \"\"\" Faq to delete id \"\"\"\n      _id: String!\n  }\n  \n  input FaqDeleteInput {\n      \"\"\" Faq to delete id \"\"\"\n      where: FaqDeleteInputClause!\n  }\n";
export default FaqDeleteInput;
