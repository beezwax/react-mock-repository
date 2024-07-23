# React Mocking with the Repository Pattern Example

This is a simple project showing how to mock a repository in a React
application.

The repository pattern is a design pattern that abstracts the data access
layer from the rest of the application. This makes it easier to test the
application because you can mock the repository and test the application
without having to worry about the data access layer.

More than testing though this example wants to show that you can replace the
implementation later on. You can start out with a mock implementation
(`./src/repositories/mock/people.ts`) and later replace it with a real
implementation.

For more information, [see the related blog post
here](https://blog.beezwax.net).
