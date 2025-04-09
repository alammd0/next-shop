// app/api/product/route.ts
import { uploadImage } from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { propertySchema } from "@/app/lib/zod/property";
import prisma from "@/app/lib/prisma";
import { Category, Size, Status } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


// Create product
export async function POST(req: NextRequest) {
    try {

        const session = await getServerSession(authOptions);

        console.log("SESSION:", session);  // ✅ Check what's coming
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse("Unauthorized: No user ID", { status: 401 });
        }

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const smallDesc = formData.get("smallDesc") as string;
        const desc = formData.get("desc") as string;
        const price = parseFloat(formData.get("price") as string);
        const salePrice = parseFloat(formData.get("salePrice") as string);
        const size = formData.get("size") as Size;
        const status = formData.get("status") as Status;
        const category = formData.get("category") as Category;
        const files = formData.getAll("image") as File[];

        const images = await Promise.all(
            files.map(async (file) => ({
                url: await uploadImage(file),
                // alt: file.name,
            }))
        );

        console.log("Images:", images);
        console.log("User ID:", userId);
        console.log("Category:", category);
        console.log("Status:", status);
        console.log("Size:", size);
        console.log("Sale Price:", salePrice);
        console.log("Price:", price);
        console.log("Description:", desc);
        console.log("Small Description:", smallDesc);
        console.log("Title:", title);

        const { success } = propertySchema.safeParse({
            title,
            smallDesc,
            desc,
            price,
            salePrice,
            size,
            status,
            category,
            userId,
            image: images,
        });

        if (!success) {
            return NextResponse.json({
                status: 400,
                message: "Validation failed. All input fields are required.",
            });
        }

        const product = await prisma.product.create({
            data: {
                title,
                smallDesc,
                desc,
                price,
                salePrice,
                size,
                status,
                category,
                userId,
                image: {
                    createMany: {
                        data: images,
                    },
                },
            },
            include: {
                image: true,
            },
        });

        return NextResponse.json(product);
    } catch (err: any) {
        console.error("Product creation failed:", err);
        return NextResponse.json({
            status: 500,
            message: "Something went wrong while creating the product.",
        });
    }
}


// get all Product api
export async function GET(req: NextRequest) {

}
