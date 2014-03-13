// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


function HomeViewModel(json_tags, json_docs) {
  var self = this;

  var MOCK_TAGS = {
    'history': {'name': 'History', 'id': 1, 'docs': [1], 'type': 'history'},
    'trash': {'name': 'Trash', 'id': 3, 'docs': [2]},
    'mine': [{'name': 'default', 'id': 2, 'docs': [3]}, {'name': 'web', 'id': 3, 'docs': [3]}],
    'notmine': [
       {'name': 'romain', 'projects': [{'name': 'example', 'id': 20, 'docs': [10]}, {'name': 'ex2', 'id': 30, 'docs': [10, 11]}]},
       {'name': 'pai', 'projects': [{'name': 'example2', 'id': 20, 'docs': [10]}]}
     ]
  };

  var MOCK_DOCUMENTS = {
    '1': {
      'id': 1,
      'name': 'my query history', 'description': '', 'url': '/beeswax/execute/design/83', 'icon': '/beeswax/static/art/icon_beeswax_24.png',
      'lastModified': '03/11/14 16:06:49', 'owner': 'admin', 'lastModifiedInMillis': 1394579209.0, 'isMine': true
    },
    '2': {
      'id': 2,
      'name': 'my query 2 trashed', 'description': '', 'url': '/beeswax/execute/design/83', 'icon': '/beeswax/static/art/icon_beeswax_24.png',
      'lastModified': '03/11/14 16:06:49', 'owner': 'admin', 'lastModifiedInMillis': 1394579209.0, 'isMine': true
     },
     '3': {
       'id': 3,
       'name': 'my query 3 tagged twice', 'description': '', 'url': '/beeswax/execute/design/83', 'icon': '/beeswax/static/art/icon_beeswax_24.png',
     'lastModified': '03/11/14 16:06:49', 'owner': 'admin', 'lastModifiedInMillis': 1394579209.0, 'isMine': true
     },
    '10': {
      'id': 10,
      'name': 'my query 3 shared', 'description': '', 'url': '/beeswax/execute/design/83', 'icon': '/beeswax/static/art/icon_beeswax_24.png',
      'lastModified': '03/11/14 16:06:49', 'owner': 'admin', 'lastModifiedInMillis': 1394579209.0, 'isMine': true
     },
    '11': {
      'id': 11,
      'name': 'my query 4 shared', 'description': '', 'url': '/beeswax/execute/design/83', 'icon': '/beeswax/static/art/icon_beeswax_24.png',
      'lastModified': '03/11/14 16:06:49', 'owner': 'admin', 'lastModifiedInMillis': 1394579209.0, 'isMine': true
     }
  };


  var ALL_DOCUMENTS = json_docs;
  self.tags = ko.mapping.fromJS(json_tags);
  self.documents = ko.observableArray([]);  
  
  self.editTagsToCreate = ko.observableArray([]);
  self.editTagsToDelete = ko.observableArray([]);

  self.trash = ko.computed(function() {
    return self.tags.trash;
  });

  self.history = ko.computed(function() {
	return self.tags.history;
  });

  self.myTags = ko.computed(function() {
    return self.tags.mine();
  });

  self.sharedTags = ko.computed(function() {
	return self.tags.notmine();
  });

  self.filterDocs = function(tag) {
    self.documents.removeAll();
    $.each(ALL_DOCUMENTS, function(id, doc) {
      if (tag.docs().indexOf(parseInt(id)) != -1) { // Beware, keys are strings in js
    	self.documents.push(doc); // pushall?
      }
	})
  }
  
  self.createTag = function(tag_json) {
	var mapped_tag = ko.mapping.fromJS({'name': 'default2', 'id': 50, 'docs': [3]}); // todo
	self.tags.mine.push(mapped_tag);
  }
}