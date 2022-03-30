const express=require('express')
const app=express()
const stripe = require("stripe")("sk_test_51JJtDxSJeurgEkzqrOayznFTmQKpOGf7kstJUZjgTp93VCTdW85aheAtqU0bsokscmYsM8GjmTiX26JiKYaxKXQd00PgV60Gst")
const uuid=require('uuid').v4
const cors=require('cors')
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cors())


app.post('/checkout',async(req,res)=>{
    console.log(req.body)
    let error,status
    try{
        const idempotencyKey=uuid()
        const {product,token}=req.body
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })

        // const charge=await stripe.charges.create({
        // amount: product.price * 100,
        // currency: "inr",
        // customer: customer.id,
        // receipt_email: token.email,
        // description: `Purchased the ${product.name}`,
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     line1: token.card.address_line1,
        //     line2: token.card.address_line2,
        //     city: token.card.address_city,
        //     country: token.card.address_country,
        //     postal_code: token.card.address_zip,
        //   },
        // },
        // },
        // { idempotencyKey: idempotencyKey }
        // )
        // console.log("Charge:",{charge});

        const payout = await stripe.payouts.create({
            amount: 1100,
            currency: 'inr',
          });

        console.log("Charge:",{payout});

        // status:"success" 
    }
    catch(error){
        console.error("Error:",error)
        // status:"failure"
    }
    res.json({error,status})
})

app.listen(PORT,()=>{
    console.log("server is working")
})