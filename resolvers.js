// db
import db from "./_db.js"

export const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(parent, args, context, info) {
            return db.games.find((item) => item.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(parent, args, context, info) {
            return db.authors.find((item) => item.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(parent, args, context, info) {
            return db.reviews.find((item) => item.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((item) => item.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((item) => item.author_id === parent.id);
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((item) => item.id === parent.author_id);
        },
        game(parent) {
            return db.games.find((item) => item.id === parent.game_id);
        }
    },
    Mutation: {
        addGame(parent, args, context, info) {
            let game = { ...args.game, id: Math.floor(Math.random() * 10000).toString() }
            db.games.push(game)
            return game
        },
        deleteGame(parent, args, context, info) {
            db.games = db.games.filter((item) => item.id !== args.id);
            return db.games
        },
        updateGame(parent, args, context, info) {
            db.games = db.games.map((item) => {
                if (item.id === args.id) {
                    return { ...item, ...args.edits }
                }
                return item;
            })

            return db.games.find((item) => item.id === args.id)
        }
    }
}