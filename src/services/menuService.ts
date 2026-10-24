import { menuData } from "../data/MenuData";

export async function getFeaturedDishes() {
    return menuData.filter((dish)=> dish.isFeatured)
}

export async function getMenuDishes() {
    return menuData
}