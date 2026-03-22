type VideoPlayerProps = {
  title: string;
  embedUrl: string;
};

export function VideoPlayer({ title, embedUrl }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft">
      <div className="aspect-video bg-slate-950">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
