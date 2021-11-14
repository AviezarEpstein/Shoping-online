export class AddProductData{
    public constructor(
    public productName: string,
    public catId: number,
    public price: number,
    public inStock: number,
    public image: string,
    public description: string,
    public brand: string,
    public quantityPerUnit: number,
    public weight: number,
    public weightType: string,
    ){}

}