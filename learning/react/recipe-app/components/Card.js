export default function Card({name, img, cal, ingredients, dish, meal, label, cuisine, share, open}) {
  return (
    <div className="card">
      <h1 className="name">{name}</h1>
      <h3 className="detail">{dish} | {meal} | {cuisine}</h3>
      <img src={img} alt={name} className="food-image" />
      <div className="cal">Calories: {cal}</div>
      <div className="label">{label}</div>
      <div className="ingredients">
        Ingredients:
        <ol>
          {ingredients.map(ingredient=>(
            <li key={ingredients.indexOf(ingredient)}>{ingredient}</li>
          ))}
        </ol>
      </div>
      <div className="actions">
        <div className="share">
          <a href={share} rel="noreferrer" target="_blank"> <span className="material-icons-outlined">share</span> </a>
        </div>
        <div className="open">
          <a href={open} rel="noreferrer" target="_blank"> <span className="material-icons-outlined">open_in_new</span> </a>
        </div>
      </div>
    </div>
  );
}