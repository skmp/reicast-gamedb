require 'json'

file = File.read('merged.json')

data_hash = JSON.parse(file)

data_hash.each do |game| 
	File.open("yamls/" + game['name'] + ".md", 'w') do |file| 
		file.puts('---')
		file.puts('layout: game')
		file.puts('id: ' + game['name'])
		file.puts('titlel: ' + game['title'])
		file.puts('status: unknown')
		file.puts('gamedb-issue: 0')
		file.puts('')
		file.puts('releases:')
		known = []
		game['discs'].each do |disc|
			id = disc['fingerprint'].split(' ')[0]
			if not known.include?(id)
				known.push(id)
		file.puts('  - id: ' + disc['fingerprint'].split(' ')[0])
		file.puts('    region: ' + disc['region'])
		file.puts('    version: ' + disc['version'])
		file.puts('    discs: ' + disc['seq_count'])
		file.puts('    medium: gdrom')
			end
		end

		file.puts('')
		file.puts('videos:')
		game['discs'].each do |disc|
			video = disc['video']
		file.puts('  - fingerprint: ' + disc['fingerprint'] + ' ' + disc['region'])
		file.puts('    title: Intro auto run')
		file.puts('    hw: i7 2720qm, GeForce 540M')
		file.puts('    yt: ' + video['youtube_id'])
		file.puts('    git: ' + video['build'].split('-')[0])
		file.puts('    platform: win86-release')
		end
		file.puts('---')
	end
end
