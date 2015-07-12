<?php
namespace MyApp\Controller;

use Zend\View\Model\ViewModel;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Json\Json;

trait ControllerTrait
{
    
    /**
     * Set the view template to 'ng-view' for angular front end
     *
     * @param ViewModel $view
     */
    protected function returnNgView()
    {
        $view = new ViewModel([
            'appName' => 'myApp',
            'script' => 'MyApp.setControllerConfig(' . Json::encode($this->viewConfig) . ');'
        ]);
        $view->setTemplate('ng-view.phtml');
        return $view;
    }
}