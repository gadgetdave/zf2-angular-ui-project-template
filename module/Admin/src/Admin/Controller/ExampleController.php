<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use MyApp\Controller\CrudController;

class ExampleController extends CrudController
{
    public function __construct()
    {
        $this->entityClass = 'Admin\Entity\Example';
        $this->viewConfig = [
            CrudController::VIEW_CONFIG_TITLE => 'Example',
            
            CrudController::VIEW_CONFIG_GET_ITEMS_URL => '/admin/example/search',
            
            CrudController::VIEW_CONFIG_CREATE_URL => 'create',
            
            CrudController::VIEW_CONFIG_STATE => [
                CrudController::VIEW_CONFIG_STATE_OTHERWISE_URL => '/',
                CrudController::VIEW_CONFIG_STATE_ROUTES => [
                    'index' => [
                        'url' => "/",
                        'templateUrl' => '/assets/views/grid.html'
                    ]
                ]
            ],
            
            CrudController::VIEW_CONFIG_GRID_OPTIONS => [
                'columnDefs' => [
                    ['field' => 'exampleId'],
                    ['field' => 'name', 'headerCellClass' => 'blue'],
                ],
            ]
        ];
    }
}
