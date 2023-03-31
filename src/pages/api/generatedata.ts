import { apiDataHelper } from "@/helpers/apiDataHelper";
import { responses } from "@/helpers/responses";
import { ShuffleArray, generateID, generateRandomDate } from "@/helpers/utils";
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

    // generate data from the static data
    const generatedData = datagenerator(40);
    // set the generated data to the database
    apiDataHelper.set(generatedData);

    // return the data as a json response with a 200 status code and a success message
    res.status(200).json({
      status: 'success',
      data: generatedData,
      message: responses.getData.main.successMessage
    });

  } catch (error) {

    // return the error as a json response with a 500 status code and an error message
    res.status(500).json({
      status: 'error',
      error: error,
      message: responses.getData.main.errorMessage
    });

  }
}

function datagenerator(productCount: number): Product[] {

  // define the data array
  let data: Product[] = [];

  // shuffle the product names
  const shuffledProductNames = ShuffleArray(productNames);

  // loop through the product count
  [...Array(productCount).keys()].forEach((i) => {
    // generate a random number between 0 and the length of the developers array
    let randomDeveloperOffset: number = Math.floor(Math.random() * developers.length);
    // if the random number is greater than the length of the developers array minus 5, set the random number to the length of the developers array minus 5
    randomDeveloperOffset = randomDeveloperOffset > developers.length - 5 ? developers.length - 5 : randomDeveloperOffset;

    // get a product name from the shuffled product names array by the index
    let randomName = shuffledProductNames[i] as string;

    // define the random product
    let randomProduct: Product = {
      productId: generateID(randomName),
      productName: randomName,
      productOwnerName: productOwners[Math.floor(Math.random() * productOwners.length)],
      developers: [],
      scrumMasterName: scrumMasters[Math.floor(Math.random() * scrumMasters.length)],
      startDate: generateRandomDate({ start: new Date(2010, 0, 1), end: new Date() }),
      methodology: Math.random() > 0.5 ? "Agile" : "Waterfall"
    }

    // loop through the developers array and add 5 random developers to the random product
    for (let j = Math.floor(Math.random() * 5); j < 5; j++) {
      randomProduct.developers.push(developers[randomDeveloperOffset + j]);
    }

    // push the random product to the data array
    data.push(randomProduct);
  });

  // return the data array
  return data;

}