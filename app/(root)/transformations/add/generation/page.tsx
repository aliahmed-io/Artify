
import Header from "@/components/shared/Header";
import GenerationForm from "@/components/shared/GenerationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const GenerationPage = async () => {
    const { userId } = await auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <>
            <Header
                title="AI Image Generation"
                subtitle="Create stunning visuals with Google Gemini"
            />

            <section className="mt-10">
                <GenerationForm
                    type="generation"
                    userId={user._id}
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    );
};

export default GenerationPage;
