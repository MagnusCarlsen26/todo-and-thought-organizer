export const handleSave = (
    onClose: () => void,
    onSave?: (editedTodos: any[]) => void,
    editedTodos?: any[]
) => {
    try {
        if (onSave && editedTodos) {
            onSave(editedTodos);
        }
    } finally {
        onClose();
    }
};

export const handleDelete = (
    onClose: () => void,
    onDelete?: (todoToDelete: any) => void,
    todoToDelete?: any
) => {
    try {
        if (onDelete && todoToDelete) {
            onDelete(todoToDelete);
        }
    } finally {
        onClose();
    }
};