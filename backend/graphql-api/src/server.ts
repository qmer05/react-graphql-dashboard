// Importér ApolloServer og gql-funktion fra apollo-server pakken
import { ApolloServer, gql } from "apollo-server"
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const supabaseUrl = 'https://iexjaqxnrjcezkjpnmwn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string

const supabase = createClient(supabaseUrl, supabaseKey)

// Definér GraphQL-schema for Campaign og Product (hvad klienten må spørge om)
const typeDefs = gql`
    type Product {
    name: String
    category: String
    basePrice: Int
    }

    type Campaign {
    id: Int
    name: String
    channel: String
    startDate: String
    endDate: String
    cost: Int
    revenue: Int
    profitMargin: Float
    product: Product
    }

    type Query {
    campaigns: [Campaign]
    campaign(id: Int!): Campaign
    }
`

// Resolver definerer hvordan data skal hentes for hvert felt i schemaet
const resolvers = {
    Query: {
        // Hent alle kampagner
        campaigns: async () => {
            const { data, error } = await supabase
                .from('campaigns')
                .select(`
                    id,
                    name,
                    channel,
                    start_date,
                    end_date,
                    cost,
                    revenue,
                    profit_margin,
                    products (
                        name,
                        category,
                        base_price
                    )
                `)
            if (error) {
                console.error(error)
                throw new Error("Kunne ikke hente kampagner")
            }

            return data.map((c: any) => ({
                id: c.id,
                name: c.name,
                channel: c.channel,
                startDate: c.start_date,
                endDate: c.end_date,
                cost: c.cost,
                revenue: c.revenue,
                profitMargin: c.profit_margin,
                product: {
                    name: c.products.name,
                    category: c.products.category,
                    basePrice: c.products.base_price
                }
            }))
        },

        // Hent en kampagne ud fra id
        campaign: async (_parent: unknown, args: { id: number }) => {
            const { data, error } = await supabase
                .from('campaigns')
                .select(`
                    id,
                    name,
                    channel,
                    start_date,
                    end_date,
                    cost,
                    revenue,
                    profit_margin,
                    products (
                        name,
                        category,
                        base_price
                    )
                `)
                .eq('id', args.id)
                .single()

            if (error) {
                console.error(error)
                throw new Error("Kunne ikke hente kampagne")
            }

            return {
                id: data.id,
                name: data.name,
                channel: data.channel,
                startDate: data.start_date,
                endDate: data.end_date,
                cost: data.cost,
                revenue: data.revenue,
                profitMargin: data.profit_margin

            }
        }

        // Brugt tidligere til at hente fra JSON fil
        /*
        campaigns: () => campaigns,

        //Returnér en kampagne ud fra dens ID
        campaign: (_parent: unknown, args: { id: number }) => {
            return campaigns.find(c => c.id === args.id)
        }
        */
    }
}

// Opret en ApolloServer med schema og resolvers
const server = new ApolloServer({ typeDefs, resolvers })

// Start serveren og log URL’en
server.listen().then(({ url }) => {
    console.log(`Server klar på ${url}`)
})