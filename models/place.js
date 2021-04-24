class Place {
  constructor(
    id,
    title,
    description,
    imageUrl,
    ownerId,
    ownerLink,
    date,
    latitude,
    longitude
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.ownerId = ownerId;
    this.ownerLink = ownerLink;
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default Place;
