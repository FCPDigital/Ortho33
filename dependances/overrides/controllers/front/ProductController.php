<?php

class ProductController extends ProductControllerCore
{

   protected function assignCategory() 
   {
        // Assign category to the template
        if (($this->category === false || !Validate::isLoadedObject($this->category) || !$this->category->inShop() || !$this->category->isAssociatedToShop()) && Category::inShopStatic($this->product->id_category_default, $this->context->shop)) {
            $this->category = new Category((int) $this->product->id_category_default, (int) $this->context->language->id);
        }

        $sub_categories = array();
        if (Validate::isLoadedObject($this->category)) {
            $sub_categories = $this->category->getSubCategories($this->context->language->id, true);

            //$rootCategory = $this.category
            // various assignements before Hook::exec
            $this->context->smarty->assign(array(
                'category' => $this->category,
                'rootCategory' => Category::getDepthCategory($this->category->id, 2),
                'subCategories' => $sub_categories,
                'id_category_current' => (int) $this->category->id,
                'id_category_parent' => (int) $this->category->id_parent,
                'return_category_name' => Tools::safeOutput($this->category->getFieldByLang('name')),
                'categories' => Category::getHomeCategories($this->context->language->id, true, (int) $this->context->shop->id),
            ));
        }
    }

}