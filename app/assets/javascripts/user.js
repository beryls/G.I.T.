function renderUserProfile(user_json, repos_json) {

	var user = [],repos;
	user[0] = $.parseJSON(user_json);
	repos = filterRepos($.parseJSON(repos_json));

	var square = 60;

		$('<div>')
			.attr('id', 'profile_box')
			.appendTo('body');

		$

	renderRepoGrid(repos);

}

	