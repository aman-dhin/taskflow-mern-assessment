export function serializeTask(doc) {
  const task = doc.toObject ? doc.toObject() : doc
  return {
    id: String(task._id),
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    assigneeId: task.assigneeId,
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
  }
}
