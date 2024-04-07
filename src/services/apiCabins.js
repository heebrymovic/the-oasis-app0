import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data: cabins, error } = await supabase.from("cabins").select("*");

	if (error) {
		throw new Error("Cabins could not be loaded	");
	}
	return cabins;
}

export async function createCabin(cabins, id) {
	const uploadImage = !cabins?.image?.includes?.("https");

	const filename = `${Math.random() + cabins.image.name}`.replaceAll("/", "");

	const oldImagePath = cabins.oldPath;

	delete cabins.oldPath;

	const filePath = uploadImage
		? `${supabaseUrl}/storage/v1/object/public/canbin-images/${filename}`
		: cabins.image;

	let cabinQuery = supabase.from("cabins");

	if (!id) {
		cabinQuery = cabinQuery
			.insert([{ ...cabins, image: filePath }])
			.select()
			.single();
	} else {
		cabinQuery = cabinQuery
			.update({ ...cabins, image: filePath })
			.eq("id", id)
			.select();
	}

	const { data, error } = await cabinQuery;

	if (error) {
		throw new Error("Cabin could not be created");
	}

	if (uploadImage) {
		if (oldImagePath) {
			await supabase.storage
				.from("canbin-images")
				.remove([oldImagePath.split("/").at(-1)]);
		}

		const { error: uploadError } = await supabase.storage
			.from("canbin-images")
			.upload(filename, cabins.image);

		if (uploadError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			throw new Error(
				"Cabin Image could not be uploaded and the cabin was not created",
			);
		}
	}

	return data;
}

export async function deleteCabin(cabinId) {
	const { data, error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", cabinId);

	if (error) {
		throw new Error("Cabin could not be deleted");
	}

	return data;
}
