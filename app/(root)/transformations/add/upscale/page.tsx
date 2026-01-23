
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getOrCreateUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddUpscalePage = async () => {
    const { userId } = await auth();

    if (!userId) redirect("/sign-in");

    const user = await getOrCreateUserByClerkId(userId);

    return (
        <>
            <Header
                title={transformationTypes.upscale.title}
                subtitle={transformationTypes.upscale.subTitle}
            />

            <section className="mt-10">
                <TransformationForm
                    action="Add"
                    userId={user._id}
                    type="upscale"
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    );
};

export default AddUpscalePage;
