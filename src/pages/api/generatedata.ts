import { apiDataHelper } from "@/helpers/apiDataHelper";
import { responses } from "@/helpers/responses";
import { generateID, generateRandomDate } from "@/helpers/utils";
import { developers } from "@/static-data/developers";
import { productOwners } from "@/static-data/productOwners";
import { productNames } from "@/static-data/productNames";
import { scrumMasters } from "@/static-data/scrumMasters";
import { Product } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function datagenerate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const generatedData = datagenerator(40);
    apiDataHelper.set(generatedData);

    res.status(200).json({
      status: 'success',
      data: generatedData,
      message: responses.getData.main.successMessage
    });

  } catch (error) {

    res.status(500).json({
      status: '500',
      error: error,
      message: responses.getData.main.errorMessage
    });

  }
}

function datagenerator(productCount: number): Product[] {

  let data: Product[] = [];

  [...Array(productCount).keys()].forEach((i) => {
    let randomDeveloperOffset: number = Math.floor(Math.random() * developers.length);
    randomDeveloperOffset = randomDeveloperOffset > developers.length - 5 ? developers.length - 5 : randomDeveloperOffset;

    let randomName = productNames[Math.floor(Math.random() * productNames.length)];

    let randomProduct: Product = {
      productId: generateID(randomName),
      productName: randomName,
      productOwnerName: productOwners[Math.floor(Math.random() * productOwners.length)],
      developers: [],
      scrumMasterName: scrumMasters[Math.floor(Math.random() * scrumMasters.length)],
      startDate: generateRandomDate({ start: new Date(2010, 0, 1), end: new Date() }),
      methodology: Math.random() > 0.5 ? "Agile" : "Waterfall"
    }

    for (let j = Math.floor(Math.random() * 5); j < 5; j++) {
      randomProduct.developers.push(developers[randomDeveloperOffset + j]);
    }

    data.push(randomProduct);
  });

  return data;

}