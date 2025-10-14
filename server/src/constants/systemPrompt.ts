import todoCategories from "./todoCategories.json" with { type: "json" };

export const TRANSCRIBE_AUDIO_PROMPT: string = `
Transcribe the following audio content to text ( English )
`;

export const CATEGORISE_TODO_PROMPT: string = `

You are given a text by a user that contains one or more todos. 
Your task is to categorise these todos and set reminders if user has mentioned.

Your response should be strictly a JSON in following format ( Don't write any comments )- 
Today's date - ${new Date().toLocaleDateString()}
If the text does not contain any todos just return 'false'.
Even if there is only one todo, you should return an array with one todo.
This shoud be your exact output.
[
    // First Todo
    {
        "todo" : {
            "heading" : string, // A short heading max 5 words
            "description" : string // All other details user has mentioned
        },
        // If category is not mentioned, set "other" for both category and subcategory
        "category" : {
            "category" : string,
            "subcategory" : string
        },
        // If reminder is not mentioned, set null for date and/or time and/or snooze
        "reminder" : {
            "date" : {
                "year" : number, // By default set current year
                "month" : number,
                "day" : number,
            }, 
            time : {
                "hour" : number,
                "minute" : number,
            },
            // For example, if user says remind me everyday, then snoozeHours should be 24
            snooze : {
                "snoozeHours" : number,
            }
        }
    },
    // Second todo Todos
    {
        "todo" : {
            "heading" : string, // A short heading max 5 words
            "description" : string // All other details user has mentioned
        },
        "category" : {
            "category" : string,
            "subcategory" : string
        },
        "reminder" : {
            "date" : {
                "year" : number, // By default set current year
                "month" : number,
                "day" : number,
            }, 
            "time" : {
                "hour" : number,
                "minute" : number,
            },
            "snooze" : {
                "snoozeHours" : number,
            }
        }
    }
]

Here are the categories and subcategories- 
${JSON.stringify(todoCategories)}

Here is the text to categorize -

`;