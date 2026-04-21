interface AvatarProps {
  image?: string;
  initial?: string;
}

export function Avatar({ image, initial }: AvatarProps) {
  if (!image && initial) {
    return (
      <div className="flex size-small shrink-0 items-center justify-center rounded-full bg-project-gray">
        <span className="text-200 leading-none text-content-on-accent uppercase">
          {initial}
        </span>
      </div>
    );
  }

  return (
    <img
      src={image}
      className="size-small shrink-0 rounded-full object-cover"
    />
  );
}
