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
use MyApp\Controller\ViewConfig;

class ExampleController extends CrudController
{
    public function __construct()
    {
        $this->entityClass = 'Admin\Entity\Example';
        $this->viewConfig = [
            'title'       => 'Example',
            'getItemsUrl' => '/admin/example/search',
            'createUrl'   => 'create',
            'state'       => [
                'otherwiseUrl' => '/',
                'routes'       => [
                    'index' => [
                        'url'         => "/",
                        'templateUrl' => '/assets/views/grid.html'
                    ],
                    'create' => [
                        'url'         => "/create",
                        'templateUrl' => 'create'
                    ],
                    'view' => [
                        'url'         => "/:exampleId/view",
                        'template' => '<div ng-include="getTemplateUrl()"></div>',
                        'controller' => 'editController'
                    ],
                    'edit' => [
                        'url'         => "/:exampleId/edit",
                        'template' => '<div ng-include="getTemplateUrl()"></div>',
                        'controller' => 'editController'
                    ],
                ]
            ],
            
            'gridOptions' => [
                'columnDefs' => [
                    [
                        'name'  => 'ID',
                        'field' => 'exampleId'
                    ],
                    [
                        'field'           => 'name',
                        'headerCellClass' => 'blue'
                    ],
                    [
                        'field'        => 'actionLinks',
                        'cellTemplate' => '<a class="btn btn-primary" ui-sref="view({id:example._id})">View</a>'
                    ],
                ],
            ],
        ];
    }
}
