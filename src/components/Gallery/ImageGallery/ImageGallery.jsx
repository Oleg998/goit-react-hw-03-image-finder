import css from "./ImageGallery.module.css"


export default function ImageGallery({ hits, showModal }) {
  const elemets = hits.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li
      key={id}
      onClick={() => showModal({ tags, largeImageURL })}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
  return <ul className={css.ImageGallery}>{elemets}</ul>;
}