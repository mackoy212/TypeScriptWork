interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
}

interface Article extends BaseContent {
    title: string;
    content: string;
    author: string;
}

interface Product extends BaseContent {
    name: string;
    price: number;
    description: string;
}

type ContentOperations<T extends BaseContent> = {
    create: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
    update: (id: string, data: Partial<T>) => T;
    delete: (id: string) => boolean;
    getById: (id: string) => T | null;
};

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

type AccessControl<T extends BaseContent> = {
    checkPermission: (role: Role, action: keyof Permission) => boolean;
};

type ValidationResult = {
    isValid: boolean;
    errors?: string[];
};

type Validator<T> = {
    validate: (data: T) => ValidationResult;
};

const articleValidator: Validator<Article> = {
    validate: (data: Article): ValidationResult => {
        const errors: string[] = [];
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

type Versioned<T extends BaseContent> = T & {
    version: number;
};

function createVersion<T extends BaseContent>(content: T): Versioned<T> {
    return {
        ...content,
        version: 1
    };
}

const exampleArticle: Article = {
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
} else {
    console.log('Validation errors:', validationResult.errors);
}