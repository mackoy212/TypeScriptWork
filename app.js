"use strict";
const articleValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.title) {
            errors.push('Title is required');
        }
        if (!data.content) {
            errors.push('Content is required');
        }
        if (!data.author) {
            errors.push('Author is required');
        }
        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined
        };
    }
};
function createVersion(content) {
    return Object.assign(Object.assign({}, content), { version: 1 });
}
const exampleArticle = {
    id: '1',
    title: 'Test Article',
    content: 'Article content',
    author: 'Author',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft'
};
const validationResult = articleValidator.validate(exampleArticle);
if (validationResult.isValid) {
    const versionedArticle = createVersion(exampleArticle);
    console.log('Article created:', versionedArticle);
}
else {
    console.log('Validation errors:', validationResult.errors);
}
//# sourceMappingURL=app.js.map