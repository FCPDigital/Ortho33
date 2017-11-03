<?php
if (!defined('_PS_VERSION_'))
{
  exit;
}

include_once(_PS_ROOT_DIR_.'/classes/Store.php');

class ListStore extends Module
{
	public function __construct()
	{
		$this->name = 'liststore';
		$this->tab = 'front_office_features';
		$this->version = '1.0.0';
		$this->author = 'Revel Solal';
		$this->need_instance = 1;
		$this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
		$this->bootstrap = true;

		parent::__construct();

		$this->displayName = $this->l('List Store');
		$this->description = $this->l('Allow to list the stores.');

		$this->confirmUninstall = $this->l('Are you sure you want to uninstall?');

		if (!Configuration::get('LISTSTORE_NAME'))
		  $this->warning = $this->l('No name provided');
	}
	public function install()
	{
	  if (Shop::isFeatureActive())
	    Shop::setContext(Shop::CONTEXT_ALL);

	  if (!parent::install() ||
	    !$this->registerHook('leftColumn') ||
	    !$this->registerHook('displayHome') ||
	    !Configuration::updateValue('LISTSTORE_NAME', 'my friend')
	  )
	    return false;

	  return true;
	}
	public function uninstall()
	{
	  if (!parent::uninstall() ||
	    !Configuration::deleteByName('LISTSTORE_NAME')
	  )
	    return false;

	  return true;
	}

	public function hookDisplayHome(){
		$stores = Store::getStores();
		
		for($i=0; $i<count($stores); $i++) {
			$stores[$i]["img"] = __PS_BASE_URI__.'/img/st/'.$stores[$i]["id"].'.jpg';
		}

		$this->context->smarty->assign(
		  array(
		      'liststore' => Configuration::get('LISTSTORE_NAME'),
		      'stores' => $stores,
		      'liststore_link' => $this->context->link->getModuleLink('liststore', 'display')
		  )
		);
		return $this->display(__FILE__, 'liststore.tpl');
	}
}