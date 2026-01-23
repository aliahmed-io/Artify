import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Link from "next/link"
import { ImagePlus, Sparkles, Eraser, Palette, Scissors, Wand2, Video, Zap } from "lucide-react"

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const sp = await searchParams;

  const pageRaw = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const queryRaw = Array.isArray(sp.query) ? sp.query[0] : sp.query;

  const page = Number(pageRaw) || 1;
  const searchQuery = queryRaw ?? '';

  const images = await getAllImages({ page, searchQuery });

  // Filter out non-transformation links for the quick actions
  const quickLinks = navLinks.filter((link) =>
    !['Home', 'Profile', 'Buy Credits'].includes(link.label)
  );

  const iconMap: { [key: string]: any } = {
    "Image Restore": ImagePlus,
    "Generative Fill": Sparkles,
    "Object Remove": Eraser,
    "Object Recolor": Palette,
    "Background Remove": Scissors,
    "Image Generation": Wand2,
    "Video Generation": Video,
    "Image Upscaling": Zap,
  };

  return (
    <>
      <section className="flex flex-col gap-8 pb-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-700 leading-tight">
            Create. <span className="text-crimson-600">Transform.</span> Inspire.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium">
            Your AI Creative Studio. Select a tool below to start creating magic.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const IconComponent = iconMap[link.label] || Sparkles;
            return (
              <Link
                key={link.route}
                href={link.route}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-crimson-100/50 bg-white shadow-sm hover:shadow-md hover:border-crimson-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-crimson-50 flex items-center justify-center group-hover:bg-crimson-100 transition-colors">
                  <IconComponent className="w-6 h-6 text-crimson-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-semibold text-sm text-dark-600 text-center group-hover:text-crimson-600 transition-colors">
                  {link.label}
                </p>
              </Link>
            )
          })}
        </ul>
      </section>

      <section className="sm:mt-8">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
