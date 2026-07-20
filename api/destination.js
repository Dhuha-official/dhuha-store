export default async function handler(req, res) {

const keyword = req.query.keyword;

const response = await fetch(
`https://api-sandbox.collaborator.komerce.id/tariff/api/v1/destination/search?keyword=${encodeURIComponent(keyword)}`,
{
headers:{
"x-api-key":process.env.RAJAONGKIR_API_KEY
}
}
);

const data = await response.json();

res.status(200).json(data);

}
