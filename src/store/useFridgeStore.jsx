import { create } from 'zustand';
import { getFridgeIngredients, addIngredient, updateIngredients, deleteIngredient } from '../api/fridgeAPI';

const defaultPageable = { page: 0, size: 20, sort: 'createdAt,desc' };

const useFridgeStore = create((set) => ({
    // State
    ingredients: [],
    isLoading: true,

    // Actions
    fetchIngredients: async (memberId) => {
        set({ isLoading: true });
        try {
            const data = await getFridgeIngredients(memberId, defaultPageable);
            if (data && data.content) {
                set({ ingredients: data.content, isLoading: false });
            }
        } catch (error) {
            console.error("Failed to fetch ingredients:", error);
            set({ isLoading: false });
        }
    },

    addIngredient: async (ingredientData, memberId) => {
        try {
            const updatedPage = await addIngredient(ingredientData, memberId, defaultPageable);
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to add ingredient:", error);
        }
    },

    updateSingleIngredient: async (updateRequest, memberId) => {
        try {
            const updatedPage = await updateIngredients([updateRequest], memberId, defaultPageable);
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to update ingredient:", error);
        }
    },

    deleteIngredient: async (fridgeIngredientId, memberId) => {
        try {
            const updatedPage = await deleteIngredient(fridgeIngredientId, memberId, defaultPageable);
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to delete ingredient:", error);
        }
    },
}));

export default useFridgeStore;