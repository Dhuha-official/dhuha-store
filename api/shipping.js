export default async function handler(req,res){

const {
shipper_destination_id,
receiver_destination_id,
origin_pin_point,
destination_pin_point,
weight
}=req.query;

const response=await fetch(
`https://api-sandbox.collaborator.komerce.id/tariff/api/v1/calculate?shipper_destination_id=${shipper_destination_id}&receiver_destination_id=${receiver_destination_id}&origin_pin_point=${origin_pin_point}&destination_pin_point=${destination_pin_point}&weight=${weight}&item_value=149000`,
{
headers:{
"x-api-key":process.env.RAJAONGKIR_API_KEY
}
}
);

const data=await response.json();

res.status(200).json(data);

}
