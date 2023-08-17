8. PATCH /api/articles/:article_id
Testing for decremented as well as incremented votes is good here.

9. DELETE /api/comments/:comment_id
Good testing and glad to see you handling the different errors.
Nice use of rowCount to find valid id.

10. GET /api/users

Good testing again here.
You could destructure {rows} in the model.

11. GET /api/articles/
Really good testing for topic to check the returned objects have the topic
Nice to see you tested for Status 404, non-existent topic query - ?topic=alpacas.
Consider adding a Status 200, valid topic query, but has no articles responds with an empty array of articles, e.g. ?topic=paper

12. GET /api/articles/:article_id (comment count)

In model allowed topics are greenlisted and include undefined, however it is the sort_by and order here 
that we want to check and not the topics. Try using default values for both of these instead of undefined.
Custom error handler is good here.  Good use of dynamic query string. 
Nice use of SQL here to add the comment_count to the article.

Error Handlers
Think about exporting these into an error handlers file to avoid cluttering app.
Lines 47-53 are duplicated from merging.
