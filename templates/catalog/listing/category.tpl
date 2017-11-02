{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{extends file='catalog/listing/product-list.tpl'}

{block name='product_list_header'}
  <div class="text-sm-center hidden-md-up">
    <h1 class="list__title">{$category.name}</h1>
  </div>

  {if $category.description}
  <div id="category-description" class="list__description">
    {$category.description nofilter}
  </div>
  {/if}

{/block}

{block name="subcategories_list"}
  <div class="row list">
    {foreach from=$subcategories item=category}
      <a href="{$category.url}" class="list__item-link col-sm-3">
        <div class="list__item">
          <h3 class="list__item-title">{$category.name}</h3>
          <img class="list__item-img" src="{$category.image.large.url}" alt="{$category.image.legend}">
        </div>
      </a>
    {/foreach}
  </div>
{/block}
