import { CollectionConfig } from "payload";


export const Tasks: CollectionConfig = {
    slug: "tasks",
    admin:{
        useAsTitle: "title",
        defaultColumns: ["title", "status", "createdAt"],
        listSearchableFields: ["title", "description"],
    },
    access: {
        read: () => true, // Everyone can read tasks
        delete: () => true, // Everyone can delete tasks
        update: () => true, // Everyone can update tasks
        create: () => true, // Everyone can create tasks
    },
    fields:[
        {
            name: "title",
            type: "text",
            required: true,
            index: true,
        },
        {
            name: "description",
            type: "textarea",
            index: true,
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "To Do", value: "todo" },
                { label: "In Progress", value: "in-progress" },
                { label: "Done", value: "done" }
            ],
            defaultValue: "todo",
            index: true,
        }
    ]
    }
