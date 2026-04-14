import { BENNU_VIDEOS } from "@/lib/config";

export default function VideoGrid() {
  const videos = [BENNU_VIDEOS.phoenix, BENNU_VIDEOS.blueprint];

  return (
    <section className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video.title}
              className="bg-elevated rounded-[14px] border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="aspect-video relative">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-primary tracking-[-0.02em]">
                  {video.title}
                </h3>
                <p className="text-[13px] text-secondary mt-1 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
