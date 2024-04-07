import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export const signUp = async ({ email, password, fullName }) => {
	let { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const login = async ({ email, password }) => {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getCurrentUser = async () => {
	let { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	let { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
};

export const updateUser = async ({
	fullName,
	avatar,
	password,
	oldPassword,
	email,
}) => {
	let updateData;

	if (fullName)
		updateData = {
			data: {
				fullName,
			},
		};

	/*If Check for existing password if password needs to be changed*/
	if (password) {
		updateData = {
			password,
		};

		const authData = localStorage.getItem(
			"sb-kvossromnsxtgsrbxtou-auth-token",
		);

		let { error: checkPasswordError } =
			await supabase.auth.signInWithPassword({
				email,
				password: oldPassword,
			});

		if (checkPasswordError) {
			localStorage.setItem(
				"sb-kvossromnsxtgsrbxtou-auth-token",
				authData,
			);
			throw new Error("Invalid Old Password");
		}
	}

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);

	if (!avatar) return data;

	const filename = uuidv4();

	const { error: uploadError } = await supabase.storage
		.from("avatars")
		.upload(filename, avatar);

	if (uploadError) throw new Error(uploadError.message);

	updateData = {
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`,
		},
	};

	const { data: updatedAvatarData, error: updateAvatarError } =
		await supabase.auth.updateUser(updateData);

	if (updateAvatarError) throw new Error(updateAvatarError.message);

	return updatedAvatarData;
};
